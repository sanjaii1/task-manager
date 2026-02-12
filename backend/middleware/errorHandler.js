
const errorHandler = (err, req, res, next) => {

  console.error("========== ERROR ==========");
  console.error("Time:", new Date().toISOString());
  console.error("Method:", req.method);
  console.error("Path:", req.path);
  console.error("Error Message:", err.message);
  console.error("Stack Trace:", err.stack);
  console.error("===========================");


  const statusCode = err.statusCode || res.statusCode || 500;


  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};


const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
