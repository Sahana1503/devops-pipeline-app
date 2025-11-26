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

        stage('Test Jenkins on Windows') {
            steps {
                echo '🔹 Running a simple Windows command...'
                bat 'echo Hello from Jenkins running on Windows!'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🔹 Building Docker image...'
                // Jenkins runs on Windows → use bat, not sh
                bat "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
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
                    // Simple login for project (not secure, but OK for college)
                    bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo '🔹 Pushing image to Docker Hub...'
                bat "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline successful! Pushed image: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
    }
}
