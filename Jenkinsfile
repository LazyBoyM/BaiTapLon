pipeline {
    agent any
    stages {
        stage('Checkout from GitHub') {
            steps {
                echo 'Pulling latest code from GitHub...'
                sh 'git pull origin main'
            }
        }
        stage('Build & Deploy Containers') {
            steps {
                echo 'Building and deploying Docker microservices...'
                sh '''
                    cd /root/marketplace-git
                    git pull origin main
                    docker compose up -d --build
                '''
            }
        }
    }
    post {
        success {
            echo '🎉 Deployment successfully finished! Website running at port 5000.'
        }
        failure {
            echo '❌ Deployment failed. Please check container logs.'
        }
    }
}
