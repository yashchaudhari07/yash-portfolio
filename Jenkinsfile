pipeline {
    agent any

    stages {

        stage('Test SSH') {
            steps {
                sshagent(credentials: ['ec2-key']) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no ubuntu@YOUR_PUBLIC_IP "hostname"
                    '''
                }
            }
        }

       stage('Deploy') {

    steps {

        sshagent(credentials: ['ec2-key']) {

            bat '''
            ssh ubuntu@YOUR_PUBLIC_IP "
            cd myproject &&
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