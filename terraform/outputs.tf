output "deploy_bucket" {
  description = "S3 bucket for Beanstalk app zips"
  value       = aws_s3_bucket.deploy_bucket.bucket
}

output "beanstalk_environment_url" {
  description = "Elastic Beanstalk environment endpoint URL"
  value       = aws_elastic_beanstalk_environment.slot_gui_env.endpoint_url
}

