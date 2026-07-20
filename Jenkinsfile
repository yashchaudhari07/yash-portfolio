pipeline {
    agent any 
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling the latest code from GitHub...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running automated application test suites...'
                // Example: sh 'npm test' or 'python -m unittest'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Logging into EC2 and deploying application...'
            }
        }
    }
}