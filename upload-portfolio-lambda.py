import boto3
import StringIO
import zipfile
import mimetypes


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    s3 = boto3.resource('s3')
    topic = sns.Topic('arn:aws:sns:ap-northeast-1:162638659792:deployPortfolio')
    
    location = {
        "bucketName": "portfolio-build.serverless4everyone.info",
        "objectKey": "portfoliobuild.zip"
    }
    
    try:
        job = event.get("CodePipeline.job")
        
        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "MyAppBuild":
                    location = artifact["location"]["s3Location"]
                    
        portfolio_bucket = s3.Bucket('portfolio.serverless4everyone.info')
        build_bucket = s3.Bucket(location["bucketName"])
        
        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)
        
        print "Building portfolio from :" + str(location)
        
        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
    
    
    
        topic.publish(Subject="Portfolio Deployment SNS", Message="Job Done")
        
        if job:
            codepipeline = boto3.client("codepipeline")
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        topic.publish(Subject="Portfolio Deployment SNS", Message="The deployment failed")
        if job:
            codepipeline = boto3.client("codepipeline")
            codepipeline.put-job-failure-result(jobId=job["id"])
    