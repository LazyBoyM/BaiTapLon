pipeline {
    agent any
    stages {
        stage('Build & Deploy Microservices') {
            steps {
                echo '🚀 Deploying automated update to CentOS host via Docker...'
                sh '''
                    docker run --rm \
                        -u 0:0 \
                        -v /root/marketplace-git:/app \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        -w /app \
                        marketplace-jenkins \
                        sh -c "git config --global --add safe.directory /app && git pull https://github.com/LazyBoyM/BaiTapLon.git main && docker compose up -d --build"
                '''
            }
        }
    }
    post {
        success {
            echo '🎉 CI/CD Automated Deployment successfully finished! Website running at port 5000.'
        }
        failure {
            echo '❌ Deployment failed. Check container logs.'
        }
    }
}
