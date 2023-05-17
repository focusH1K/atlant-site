const express = require("express")
const cors = require('cors')
const router = require('./routes/index.js')
const cookieParser = require('cookie-parser')
const model = require('./models/model.js')
const errorMiddleware = require('./middleware/errorMiddleware.js')
const passport = require('passport')
const VKontakteStrategy = require('passport-vkontakte').Strategy
const config = require("./config.js")
const bcrypt = require('bcryptjs')
const fileUpload = require('express-fileupload')
const path = require('path')
const tokenService =require('./service/tokenService.js')
const UserDto = require('./dtos/userDto.js')
const uuid = require('uuid')

const PORT = 7000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(
    require('express-session')({
        secret: "keyboard-cat",
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(
    new VKontakteStrategy(
        {
            clientID: '51644255',
            clientSecret: '90Fk5H1BSGrpy5LJ67rw',
            callbackURL: 'http://localhost:7000/login/vkontakte/callback',
            scope: ['email'],
            profileFields: ['email']
        },
        async function (accessToken, refreshToken, params, profile, done) {
            try {
                const user = await model.User.findOne({ where: { id: profile.id } })
                
                if (!user) {
                    const hashPassword = await bcrypt.hash('VkLoginSite', 8)
                    const activation_link = uuid.v4()

                    await model.User.create({
                        id: profile.id,
                        username: profile.username,
                        email: profile.emails[0].value,
                        password: hashPassword,
                        activation_link: activation_link,
                        is_activated: true
                    })
                }

                const currentUser = await model.User.findOne({
                    attributes: ['email', 'id', 'is_activated'],
                    where: {
                        id: profile.id
                    }
                })

                const userDto = new UserDto(currentUser)
                const tokens = tokenService.generateTokens({...userDto})
                await tokenService.saveToken(userDto.id, tokens.refreshToken)

                return done(null, profile) 
            } catch (e) {
                console.log(e);
                return done(e);
            }
        }
    )
);
passport.serializeUser(function (user, done) {
    console.log("SERIALIZE", user)
    done(null, JSON.stringify(user))
})
passport.deserializeUser(function (data, done) {
    console.log("DESERIALIZE", data)
    done(null, JSON.parse(data))
})

app.get(
    '/login/vkontakte/callback',
    passport.authenticate('vkontakte', {
        successRedirect: `/profile`,
        failureRedirect: 'http://localhost:3000/login',
    })
);

app.get('/login/vkontakte', passport.authenticate('vkontakte'))

app.get('/profile', async function (req, res) {
    try {
        res.redirect(`http://localhost:3000/loginvk/${req.user.id}`)
    } catch(e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
});

app.get("/api/loginvk-done/:id", async (req, res) => {
    try {
        const user = await model.User.findOne({ where: { id: req.params.id } })
    
        if (!user) {
            throw new Error()
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userDto})
    
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Server Error'})
    }
});

app.use('/api', router)
app.use(errorMiddleware)



const start = async () => {
    try {
        await model.sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started om PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()