import { TryCatch } from "../middlewares/error.middleware.js";
import { Job } from "../models/job.model.js";
import { ErrorHandler } from "../utils/utility.js";

export const postJob = TryCatch(async (req, res, next) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
  } = req.body;
  const userId = req.id;

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !experience ||
    !position ||
    !companyId
  ) {
    return next(
      new ErrorHandler("Something is missing please check again", 404)
    );
  }
  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(","),
    salary: Number(salary),
    location,
    jobType,
    experienceLevel: experience,
    position,
    company: companyId,
    created_by: userId,
  });
  return res.status(201).json({
    message: "New job created successfully.",
    job,
    success: true,
  });
});

//user
export const getAllJobs = TryCatch(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const jobs = await Job.find({
    $or: [
      {
        title: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        description: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  })
    .populate({
      path: "company",
    })
    .sort({
      createdAt: -1,
    });

  if (!jobs) {
    return next(new ErrorHandler("No Jobs Found", 404));
  }

  return res.status(200).json({
    message: "Jobs found successfully",
    jobs,
    success: true,
  });
});

//user
export const getJobById = TryCatch(async (req, res, next) => {
  const jobId = req.params.id;

  const job = await Job.findById(jobId).populate({
    path: "applications",
    populate: {
      path: "applicant",
    },
  });

  if (!job) {
    return next(new ErrorHandler("Jobs not Found", 400));
  }

  return res.status(200).json({ job, success: true });
});

//recruiter
export const getAdminJobs = TryCatch(async (req, res, next) => {
  const adminId = req.id;

  const jobs = await Job.find({ created_by: adminId })
    .populate({
      path: "company",
    })
    .sort({
      createdAt: -1,
    });

  if (!jobs) {
    return next(new ErrorHandler("Jobs not Found", 400));
  }

  return res.status(200).json({ jobs, success: true });
});
