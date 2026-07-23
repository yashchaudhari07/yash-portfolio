pipeline {
    agent any

    stages {

        stage('Test SSH') {
            steps {
                bat '''
                ssh -i C:\\Users\\Admin\\.ssh\\docker-key-pair.pem ^
                -o StrictHostKeyChecking=no ^
                ubuntu@13.204.43.129 ^
                "hostname"
                '''
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                ssh -i C:\\Users\\Admin\\.ssh\\docker-key-pair.pem ^
                -o StrictHostKeyChecking=no ^
                ubuntu@13.204.43.129 ^
                "cd /home/ubuntu/yash-portfolio && git pull"
                '''
            }
        }

    }
}