terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = var.aws_region
}

resource "random_id" "suffix" {
  byte_length = 4
}

# Comment this out if you are using a pre-existing bucket
resource "aws_s3_bucket" "deploy_bucket" {
  bucket        = "slot-gui-deploy-micqdf-20240601"
  force_destroy = true
}


resource "aws_elastic_beanstalk_application" "slot_gui_app" {
  name        = var.eb_app_name
  description = "Elastic Beanstalk application for slot-gui Node app"
}

resource "aws_elastic_beanstalk_environment" "slot_gui_env" {
  name                = var.eb_env_name
  application         = aws_elastic_beanstalk_application.slot_gui_app.name
  solution_stack_name = var.eb_stack # e.g., Node.js 18 on Amazon Linux 2
  version_label       = "init" # <-- ADD THIS

  # Single-instance (default), or change to "LoadBalanced"
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t3.micro"
  }

  # Optional: Set env vars, etc.
  # setting {
  #   namespace = "aws:elasticbeanstalk:application:environment"
  #   name      = "NODE_ENV"
  #   value     = "production"
  # }
}

