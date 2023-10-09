// Custom error handling middleware
exports.handleError = (err, req, res, next) => {
    console.error(err.stack);
  
    // Handle specific error types as needed
    if (err.name === 'ValidationError') {
      // Handle validation errors (e.g., invalid form data)
      res.status(400).render('error', { error: 'Validation Error', message: err.message });
    } else if (err.name === 'UnauthorizedError') {
      // Handle unauthorized access errors
      res.status(401).render('error', { error: 'Unauthorized', message: 'Access denied. Please log in.' });
    } else {
      // Handle other types of errors
      res.status(500).render('error', { error: 'Internal Server Error', message: 'Something went wrong.' });
    }
  };
  