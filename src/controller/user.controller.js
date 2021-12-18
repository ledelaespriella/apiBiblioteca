import UserModel from './../model/user.model';
import BookModel from './../model/book.model';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    const body = req.body;
    body.password = hashSync(body.password, 10);
    const user = new UserModel(body);
    await user.save();
    return res.json({ status: true });
  } catch (e) {
    return res.json({ status: false, errors: e.message });
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;
    const verify = await UserModel.findOne({ email: body.email, state: true })
      .populate('prestamos.book_id');
    if (verify) {
      if (compareSync(body.password, verify.password)) {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 30,
            data: { id: verify._id, nombre: verify.nombre, email: verify.email },
          },
          process.env.JWT_SECRET
        );

        return res.json({ status: true, token });
      } else {
        return res.json({
          status: false,
          errors: 'Email and password incorrect',
        });
      }
    } else {
      return res.json({
        status: false,
        errors: 'Email and password incorrect',
      });
    }
  } catch (e) {
    return res.json({ status: false, errors: e.message });
  }
};

const update = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    await UserModel.findByIdAndUpdate(params.userId, body);
    return res.json({ status: true });
  } catch (ex) {
    return res.json({ status: false, errors: ex.message });
  }
};

const remove = async (req, res) => {
  try {
    const params = req.params;
    await UserModel.findByIdAndDelete(params.userId);
    return res.json({ status: true });
  } catch (err) {
    return res.json({ status: false, errors: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    const category = await UserModel.findById(user.data.id).populate('prestamos.book_id');
    return res.json({ status: true, item: category });
  } catch (err) {
    return res.json({ status: false, errors: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const user = req.user;
    const category = await UserModel.findById(user.data.id).populate('prestamos.book_id');
    return res.json({ status: true, results: category.prestamos });
  } catch (err) {
    return res.json({ status: false, errors: err.message });
  }
};

const prestamos = async (req, res) => {

  try {
    const user = req.user;
    const params = req.params;
    const body = req.body;

    const category = await BookModel.findById(params.bookId);

    if (category.state) {
      await BookModel.findByIdAndUpdate(params.bookId, { state: false });

      let update = {
        $push: { 
          prestamos: body 
        }
      }
      await UserModel.findByIdAndUpdate(user.data.id, update);

      return res.json({ status: true });
    } else {
      return res.json({ status: false });
    }

    // const token = sign(
    //   {
    //     exp: Math.floor(Date.now() / 1000) + 60 * 30,
    //     data: { id: user.data.id, nombre: user.data.nombre, email: user.data.email, prestamos: body },
    //   },
    //   process.env.JWT_SECRET
    // );

    // req.headers['authorization']=token;


  } catch (ex) {
    return res.json({ status: false, errors: ex.message });
  }

};


export { register, login, getUser, update, remove, getBooks, prestamos };
