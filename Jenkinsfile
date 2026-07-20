pipeline {
    agent any

    environment {
        EC2_CREDENTIALS_ID = 'ec2-cicd-id'
        EC2_PUBLIC_IP     = '13.233.192.82' // Your verified EC2 Public IP
        EC2_USER          = 'ubuntu'
        PROJECT_DIR        = '/home/ubuntu/Yash-portfolio/yash-portfolio'
    }

    stages {
        stage('Local Verification') {
            steps {
                echo 'Checking local source code configuration...'
                checkout scm
            }
        }

        stage('Remote Pull & Restart Application') {
            steps {
                echo 'Connecting securely to EC2 to pull new changes and restart server...'
                sshagent([EC2_CREDENTIALS_ID]) {
                    // 1. Connect to EC2, navigate to your portfolio folder, and pull the latest code directly from GitHub
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_PUBLIC_IP} 'cd ${PROJECT_DIR} && git pull origin main'"
                    
                    // 2. Install any updated package dependencies on the server
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_PUBLIC_IP} 'cd ${PROJECT_DIR} && npm install'"
                    
                    // 3. Stop any existing application instances running on port 3000 to free up the port
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_PUBLIC_IP} 'sudo kill -9 \$(sudo lsof -t -i:3000) || true'"
                    
                    // 4. Start the React server in the background so it stays alive after Jenkins disconnects
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_PUBLIC_IP} 'cd ${PROJECT_DIR} && BUILD_ID=dontKillMe nohup npm start > /dev/null 2>&1 &'"
                }
            }
        }
    }
}