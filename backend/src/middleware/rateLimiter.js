import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit"); // Instead of "my-rate-limit" we would normally would put userId or user IP address so it's on an individual user basis

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error: ", error);

    next(error);
  }
};

export default rateLimiter;
