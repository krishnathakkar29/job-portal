import { TryCatch } from "../middlewares/error.middleware.js";
import { Company } from "../models/company.model.js";
import { ErrorHandler } from "../utils/utility.js";

export const registerCompany = TryCatch(async (req, res, next) => {
  const { companyName } = req.body;

  const existingCompany = await Company.findOne({
    name: companyName,
  });

  if (existingCompany) {
    return next(new ErrorHandler("Can't register the same company again", 404));
  }

  const company = await Company.create({
    name: companyName,
    userId: req.id,
  });

  return res.status(201).json({
    message: "Company registered successfully.",
    company,
    success: true,
  });
});

export const getCompany = TryCatch(async (req, res, next) => {
  const companies = await Company.find({
    userId: req.id,
  });

  if (!companies) {
    return res.status(404).json({
      message: "Companies not found.",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Found Companies",
    companies,
    success: true,
  });
});

export const getCompanyById = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Invalid Company Id", 400));
  }

  const company = await Company.findById(id);
  if (!company) {
    return res.status(404).json({
      message: "Company not found.",
      success: false,
    });
  }
  return res.status(200).json({
    company,
    success: true,
  });
});

export const updateCompany = TryCatch(async (req, res, next) => {
  const { description, website, location, name } = req.body;

  //   const logo = req.file

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      website,
      location,
    },
    {
      new: true,
    }
  );

  if (!company) {
    return next(new ErrorHandler("Company not updated", 404));
  }
  return res.status(200).json({
    message: "Company information updated.",
    success: true,
  });
});
