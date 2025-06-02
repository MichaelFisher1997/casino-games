provider "aws" {
  region = "us-east-1"
}

# --- IAM Role and Profile for Beanstalk EC2 instances ---
resource "aws_iam_role" "beanstalk_ec2_role" {
  name = "aws-elasticbeanstalk-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "beanstalk_ec2_policy" {
  role       = aws_iam_role.beanstalk_ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "beanstalk_ec2_profile" {
  name = "aws-elasticbeanstalk-ec2-role"
  role = aws_iam_role.beanstalk_ec2_role.name
}

# --- Elastic Beanstalk Application and App Version ---
resource "aws_elastic_beanstalk_application" "slot_gui_app" {
  name        = "slot-gui-app"
  description = "Elastic Beanstalk application for slot-gui Node app"
}

resource "aws_elastic_beanstalk_application_version" "init" {
  name        = "init"
  application = aws_elastic_beanstalk_application.slot_gui_app.name
  bucket      = "slot-gui-deploy-micqdf-20240601"
  key         = "app.zip"
}

# --- Elastic Beanstalk Environment ---
resource "aws_elastic_beanstalk_environment" "slot_gui_env" {
  name                = "slot-gui-env"
  application         = aws_elastic_beanstalk_application.slot_gui_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.5.2 running Docker"
  version_label       = aws_elastic_beanstalk_application_version.init.name

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

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.beanstalk_ec2_profile.name
  }
}

output "beanstalk_environment_url" {
  value = aws_elastic_beanstalk_environment.slot_gui_env.endpoint_url
}

