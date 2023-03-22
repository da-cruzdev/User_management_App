const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const { customerValidator } = require("../validators");

exports.homepage = async (req, res) => {
  const messages = await req.flash("info");
  const locals = {
    title: "NodeJS",
    description: "Free NodeJS User Management",
  };

  let perPage = 8;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Customer.count();
    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {}
};

exports.addCustomer = async (req, res) => {
  const errors = req.flash("errors")[0] || {};
  const formData = req.flash("formData")[0] || {};
  const locals = {
    title: "Add new Customer - NodeJs",
    description: "Free NodeJS User Management",
  };

  res.render("customer/add", { locals, errors, formData });
};

exports.postCustomer = async (req, res) => {
  const { error, value } = customerValidator.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.reduce((acc, current) => {
      acc[current.context.key] = current.message;
      return acc;
    }, {});
    req.flash("errors", errors);
    req.flash("formData", req.body);
    res.redirect("add");
  } else {
    const newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
    });
    try {
      await Customer.create(newCustomer);
      req.flash("info", "New customer has been added.");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
  // const { error, value } = customerValidator.validate(req.body, {
  //   abortEarly: false,
  // });
  // if (error) {
  //   const errors = error.details.reduce((acc, current) => {
  //     acc[current.context.key] = current.message;
  //     return acc;
  //   }, {});
  //   req.flash("errors", errors);
  //   req.flash("formData", req.body);
  //   res.redirect("add");
  // } else {
  //   const newCustomer = new Customer({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     tel: req.body.tel,
  //     email: req.body.email,
  //     details: req.body.details,
  //   });
  //   try {
  //     await Customer.create(newCustomer);
  //     req.flash("info", "New customer has been added.");
  //     req.flash("formData", {});
  //     req.flash("valid", "The form has been successfully submitted.");
  //     res.redirect("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};

exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "View Customer Data",
      description: "Free NodeJS User Management",
    };
    res.render("customer/view", { locals, customer });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJS User Management",
    };
    res.render("customer/edit", { locals, customer });
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
    });

    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    await req.flash("info", "This customer has been deleted.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.searchCustomer = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    const locals = {
      title: "Search Customer",
      description: "Free NodeJS User Management",
    };
    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
