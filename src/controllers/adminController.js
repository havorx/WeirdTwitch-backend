import * as adminService from '../services/adminService.js';

export async function updateRole(req, res, next) {
  try {
    const data = {params: req.params, body: req.body};
    const result = await adminService.updateUserRole(data);
    return res.status(200).send({message: 'role changed to admin'}, result);
  } catch (err) {
    return next(err);
  }
}
