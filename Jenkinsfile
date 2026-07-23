pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no ubuntu@YOUR_EC2_IP "
                    cd /home/ubuntu/app &&
                    git pull &&
                    npm install &&
                    pm2 restart app
                    "
                    '''
                }
            }
        }
    }
}