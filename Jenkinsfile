pipeline {
    agent any

    stages {

        stage('Test SSH') {
            steps {
                sshagent(credentials: ['ec2-key']) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no ubuntu@13.204.43.129 "hostname"
                    '''
                }
            }
        }

       stage('Deploy') {

    steps {

        sshagent(credentials: ['ec2-key']) {

            bat '''
            ssh ubuntu@13.204.43.129 "
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