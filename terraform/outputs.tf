output "beanstalk_environment_url" {
  description = "Elastic Beanstalk environment endpoint URL"
  value       = aws_elastic_beanstalk_environment.slot_gui_env.endpoint_url
}

