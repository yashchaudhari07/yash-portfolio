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
                echo 'Connecting securely to EC2 with dynamic Windows file permissions...'
                
                withCredentials([sshUserPrivateKey(credentialsId: env.EC2_CRED_ID, keyFileVariable: 'KEY_PATH')]) {
                    
                    // 1. Reset file inheritance
                    bat "icacls \"%KEY_PATH%\" /c /t /inheritance:d"
                    
                    // 2. Dynamically assign full rights to the hidden Jenkins service account (whoami)
                    bat "for /f \"tokens=*\" %%A in ('whoami') do icacls \"%KEY_PATH%\" /c /t /grant \"%%A:F\""
                    
                    // 3. Remove shared system group access
                    bat "icacls \"%KEY_PATH%\" /c /t /remove \"BUILTIN\\Users\""
                    bat "icacls \"%KEY_PATH%\" /c /t /remove \"Everyone\""
                    
                    // 4. Execute the remote pull on the EC2 server now that the key is secure
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && git pull origin main\""
                    
                    // 5. Install fresh dependencies on the EC2 server
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && npm install\""
                    
                    // 6. Terminate any stale process currently occupying port 3000
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"sudo kill -9 \$(sudo lsof -t -i:3000) || true\""
                    
                    // 7. Relaunch the React portfolio application process cleanly in the background
                    bat "ssh -o StrictHostKeyChecking=no -i \"%KEY_PATH%\" ${EC2_USER}@${EC2_PUBLIC_IP} \"cd ${PROJECT_DIR} && BUILD_ID=dontKillMe nohup npm start > /dev/null 2>&1 &\""
                }
            }
        }
    }
}