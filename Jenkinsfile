pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sahana1503/devops-pipeline-app"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔹 Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🔹 Checking Docker installation...'
                sh 'docker version'

                echo '🔹 Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo '🔹 Logging into Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo '🔹 Pushing image to Docker Hub...'
                sh 'docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline successful! Pushed image: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
        }
        failure {
            echo '❌ Pipeline failed. Check above logs.'
        }
    }
}
