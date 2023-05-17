const model = require('../models/model.js')
const ApiError = require('../exeptions/apiError.js')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class FlatController {
  async create(req, res, next) {
    try {
      const { name, description, price, area, category_id } = req.body
      const { image } = req.files
      let fileName = uuid.v4() + '.jpg'
      let filePath = path.resolve(__dirname, '..', 'static', fileName)
      image.mv(filePath)

      const flat = await model.Flat.create({ name, description, price, area, category_id, image: fileName })

      return res.json(flat)
    } catch (e) {
      next(ApiError.BadRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const flat = await model.Flat.findByPk(id);
      const { price, status } = req.body;
      let fileName = flat.image;
      let buyerId = null; 
  
      if (req.files && req.files.image) {
        const { image } = req.files;
        fileName = uuid.v4() + '.jpg';
        let filePath = path.resolve(__dirname, '..', 'static', fileName);
        image.mv(filePath);
        if (flat.image) {
          // Delete the existing image file
          fs.unlinkSync(path.resolve(__dirname, '..', 'static', flat.image));
        }
      }
  
      if (status === 'available') {
        if (flat.status === 'not available') {
          await model.PurchaseHistory.destroy({ where: { flatId: flat.id } });
        }
        if (flat.status === 'reserved') {
          await model.Reservation.destroy({ where: { flatId: flat.id } });
        }
        buyerId = null; 
      } else {
        buyerId = flat.buyer_id;
      }

      if (price === '') {
        flat.update({ status, image: fileName, buyer_id: buyerId });
        await flat.save()
      } else {
        flat.update({ price, status, image: fileName, buyer_id: buyerId });
        await flat.save();
      }
  
      return res.json(flat);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { category_id } = req.query;

    let flats;
    if (category_id) {
      flats = await model.Flat.findAll({
        where: { category_id },
      });
    } else {
      flats = await model.Flat.findAll();
    }

    return res.json(flats);
  }

  async getOne(req, res) {
    const { id } = req.params
    const flat = await model.Flat.findByPk(id)
    return res.json(flat)
  }



  async delete(req, res) {
    const { id } = req.params
    const flat = await model.Flat.findByPk(id)
    await flat.destroy()
    return res.json(flat)
  }
}

module.exports = new FlatController()