export const AppError = {
  USER_EXISTS: "User with this email exists.",
  USER_DONT_EXIST: "User not found.",
  INVALID_CREDENTIALS: "Invalid credentials.",
  POST_EXISTS: "Post with this title exists.",
  TAGS_NOT_FOUND: "Tags with this id not found.",
  IMAGE_TYPE: "Only image files are allowed.",
};

export const ErrorNames = {
  UNIQUE_ERROR: "SequelizeUniqueConstraintError",
  FOREIGN_KEY_ERROR: "SequelizeForeignKeyConstraintError",
};
