pipeline {
    agent any

    environment {
        // Use the exact ID of the SSH credential you stored in Jenkins
        EC2_CRED_ID    = 'ec2-cicd-id' 
        EC2_PUBLIC_IP  = '13.233.192.82'
        EC2_USER       = 'ubuntu'
        PROJECT_DIR    = '/home/ubuntu/Yash-portfolio/yash-portfolio'
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
                echo 'Connecting securely to EC2 using withCredentials block...'
                
                // This block replaces the crashing sshagent plugin
                withCredentials([sshUserPrivateKey(credentialsId: env.EC2_CRED_ID, keyFileVariable: 'KEY_PATH')]) {
                    
                    // 1. Pull the latest code inside your EC2 repo directory
                    bat "ssh -o StrictHostKeyChecking=no -i %KEY_PATH% ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && git pull origin main\""
                    
                    // 2. Install any freshly updated npm packages on your server
                    bat "ssh -o StrictHostKeyChecking=no -i %KEY_PATH% ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && npm install\""
                    
                    // 3. Force stop any legacy process currently occupying port 3000
                    bat "ssh -o StrictHostKeyChecking=no -i %KEY_PATH% ${EC2_USER}@${EC2_PUBLIC_IP} \"sudo kill -9 \$(sudo lsof -t -i:3000) || true\""
                    
                    // 4. Fire up the React background server process cleanly
                    bat "ssh -o StrictHostKeyChecking=no -i %KEY_PATH% ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && BUILD_ID=dontKillMe nohup npm start > /dev/null 2>&1 &\""
                }
            }
        }
    }
}