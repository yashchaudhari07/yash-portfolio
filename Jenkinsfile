pipeline {
    agent any

    environment {
        // Unique ID you will set inside the Jenkins Credentials Manager
        EC2_CREDENTIALS_ID = 'ec2-cicd-id'
        // The public IP or Public DNS of your AWS EC2 Instance
        EC2_PUBLIC_IP     = '13.233.192.82'
        // Default SSH user for Ubuntu instances
        EC2_USER          = 'ubuntu'
        // The directory on EC2 where your web server (like Nginx) serves the site
        TARGET_DIR        = '/var/www/html'
    }

   stages {
        stage('Code Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Test') {
            steps {
                echo 'Installing dependencies and running tests...'
                sh 'npm install'
                sh 'CI=true npm test -- --watchAll=false'
            }
        }

        stage('Build React App') {
            steps {
                echo 'Compiling React production build...'
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Cleaning old files and deploying new React app...'
                sshagent([EC2_CREDENTIALS_ID]) {
                    // 1. Grant permissions and delete the default Nginx index file along with older builds
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_PUBLIC_IP} 'sudo rm -f ${TARGET_DIR}/index.nginx-debian.html && sudo chown -R ubuntu:ubuntu ${TARGET_DIR}'"
                    
                    // 2. Copy the freshly built React production files directly into /var/www/html
                    sh "scp -r build/* ${EC2_USER}@${EC2_PUBLIC_IP}:${TARGET_DIR}/"
                }
            }
        }
    }
}