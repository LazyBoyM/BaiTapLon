pipeline {
    agent any
    stages {
        stage('Build & Deploy to Server') {
            steps {
                echo '🚀 Pulling latest code from Public GitHub Repo and rebuilding microservices...'
                sh '''
                    cd /root/marketplace-git
                    git pull https://github.com/LazyBoyM/BaiTapLon.git main
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
            echo '❌ Deployment failed. Check container logs.'
        }
    }
}
