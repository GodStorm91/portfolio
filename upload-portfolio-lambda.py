import boto3
import StringIO
import zipfile
import mimetypes


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    s3 = boto3.resource('s3')
    topic = sns.Topic('arn:aws:sns:ap-northeast-1:162638659792:deployPortfolio')
    
    try:
        portfolio_bucket = s3.Bucket('portfolio.serverless4everyone.info')
        build_bucket = s3.Bucket('portfolio-build.serverless4everyone.info')
        
        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)
        
        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
    
    
    
        topic.publish(Subject="Portfolio Deployment SNS", Message="Job Done")
    
    except:
        topic.publish(Subject="Portfolio Deployment SNS", Message="The deployment failed")
    