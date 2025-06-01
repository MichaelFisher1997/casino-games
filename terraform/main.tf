provider "aws" {
  region = "us-east-1"
}

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

resource "aws_elastic_beanstalk_environment" "slot_gui_env" {
  name                = "slot-gui-env"
  application         = aws_elastic_beanstalk_application.slot_gui_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.5.2 running Node.js 18"
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
}
