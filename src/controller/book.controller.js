import BookModel from './../model/book.model';


const show = async (req, res) => {
    try {
        const data = await BookModel.find({});
        return res.json({ status: true, results: data });
    } catch (err) {
        return res.json({ status: false, errors: err.message });
    }
};

const save = async (req, res) => {
    try {
        const data = req.body;
        const model = new BookModel(data);
        await model.save();
        return res.json({ status: true });
    } catch (err) {
        return res.json({ status: false, errors: err.message });
    }
};

const index = async (req, res) => {
    try {
        const params = req.params;
        const category = await BookModel.findById(params.bookId);
        return res.json({ status: true, data: category });
    } catch (err) {
        return res.json({ status: false, errors: err.message });
    }
};

const update = async (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        await BookModel.findByIdAndUpdate(params.bookId, body);
        return res.json({ status: true });
    } catch (ex) {
        return res.json({ status: false, errors: ex.message });
    }
};

const remove = async (req, res) => {
    try {
        const params = req.params;
        await BookModel.findByIdAndDelete(params.bookId);
        return res.json({ status: true });
    } catch (err) {
        return res.json({ status: false, errors: err.message });
    }
};

export { show, save, index, update, remove };
