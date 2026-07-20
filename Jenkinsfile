pipeline {
    agent any

    environment {
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
                echo 'Connecting securely to EC2 with restrictive Windows file permissions...'
                
                withCredentials([sshUserPrivateKey(credentialsId: env.EC2_CRED_ID, keyFileVariable: 'KEY_PATH')]) {
                    // 1. Reset file inheritance and grant exclusive access only to the current executing system user
                    bat "icacls \"%KEY_PATH%\" /c /t /inheritance:d"
                    bat "icacls \"%KEY_PATH%\" /c /t /grant %USERNAME%:F"
                    bat "icacls \"%KEY_PATH%\" /c /t /remove \"BUILTIN\\Users\""
                    bat "icacls \"%KEY_PATH%\" /c /t /remove \"Everyone\""
                    
                    // 2. Execute the remote pull on the EC2 server now that the key is secure
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && git pull origin main\""
                    
                    // 3. Install fresh dependencies on the EC2 server
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && npm install\""
                    
                    // 4. Terminate any stale process running on port 3000
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"sudo kill -9 \$(sudo lsof -t -i:3000) || true\""
                    
                    // 5. Relaunch the React portfolio application process cleanly in the background
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && BUILD_ID=dontKillMe nohup npm start > /dev/null 2>&1 &\""
                }
            }
        }
    }
}