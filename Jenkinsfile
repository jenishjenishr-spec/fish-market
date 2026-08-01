ipipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'rkjenish'     // <-- change this
        IMAGE_NAME     = "${DOCKERHUB_USER}/fish-market"
        EC2_HOST       = 'ubuntu@your-ec2-public-ip'    // <-- change this
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/fish-market.git' // <-- change this
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                            docker pull ${IMAGE_NAME}:latest &&
                            docker stop fish-market || true &&
                            docker rm fish-market || true &&
                            docker run -d --name fish-market -p 80:80 ${IMAGE_NAME}:latest
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully! Site is live on EC2.'
        }
        failure {
            echo 'Pipeline failed — check the stage logs above.'
        }
    }
}
