variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}


variable "eb_app_name" {
  description = "Elastic Beanstalk application name"
  type        = string
  default     = "slot-gui-app"
}

variable "eb_env_name" {
  description = "Elastic Beanstalk environment name"
  type        = string
  default     = "slot-gui-env"
}

variable "eb_stack" {
  description = "Elastic Beanstalk solution stack (Node.js version)"
  type        = string
  default     = "64bit Amazon Linux 2023 v6.5.2 running Node.js 18"
}

