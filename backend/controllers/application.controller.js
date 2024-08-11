import { TryCatch } from "../middlewares/error.middleware.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { ErrorHandler } from "../utils/utility.js";

export const applyJob = TryCatch(async (req, res, next) => {
  const jobId = req.params.id;
  console.log("reached apply job par");
  
  if (!jobId) {
    return next(new ErrorHandler("Invalid Job Application", 400));
  }

  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: req.id,
  });

  if (existingApplication) {
    return next(new ErrorHandler("Already applied for the job", 404));
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found", 400));
  }

  const newApplication = await Application.create({
    applicant: req.id,
    job: jobId,
  });

  job.applications.push(newApplication._id);
  await job.save();

  return res.status(201).json({
    message: "Job applied successfully.",
    success: true,
  });
});

export const getAppliedJobs = TryCatch(async (req, res, next) => {
  const application = await Application.findOne({
    applicant: req.id,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      options: {
        sort: {
          createAt: -1,
        },
      },
      populate: {
        path: "company",
        options: {
          sort: {
            createAt: -1,
          },
        },
      },
    });

  if (!application) {
    return next(new ErrorHandler("No Application Found", 404));
  }
  return res.status(200).json({
    application,
    success: true,
  });
});

//admin will see thejobs
export const getApplicants = TryCatch(async (req, res, next) => {
  const jobId = req.params.id;

  const job = await Job.findById(jobId).populate({
    path: "applications",
    options: {
      sort: {
        createdAt: -1,
      },
    },
    populate: {
      path: "applicant",
    },
  });

  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }
  return res.status(200).json({
    job,
    success: true,
  });
});

export const updateStatus = TryCatch(async (req, res, next) => {
  const { status } = req.body;
  const applicationId = req.params.id;

  if (!status) {
    return next(new ErrorHandler("Status is required", 404));
  }

  const application = await Application.findOne({ _id: applicationId });
  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }

  application.status = status.toLowerCase();
  await application.save();

  return res.status(200).json({
    message: "Status updated successfully.",
    success: true,
  });
});
