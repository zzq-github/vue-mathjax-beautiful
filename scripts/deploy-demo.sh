#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查git状态
check_git_status() {
    if [[ -n $(git status --porcelain) ]]; then
        log_warning "工作目录有未提交的更改"
        read -p "是否继续部署? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_error "部署已取消"
            exit 1
        fi
    fi
}

# 检查分支
check_branch() {
    local current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
        log_warning "当前不在主分支 (当前: $current_branch)"
        read -p "是否继续部署? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_error "部署已取消"
            exit 1
        fi
    fi
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."
    pnpm install
    log_success "依赖安装完成"
}

# 构建核心包
build_core() {
    log_info "构建核心包..."
    cd packages/core
    npm run build
    cd ../..
    log_success "核心包构建完成"
}

# 构建示例项目
build_demo() {
    log_info "构建示例项目..."
    cd examples/playground
    
    # 设置GitHub Pages的base路径
    export VITE_BASE_URL="/vue-mathjax-beautiful/"
    
    npm run build
    cd ../..
    log_success "示例项目构建完成"
}

# 部署到GitHub Pages
deploy_to_github_pages() {
    log_info "部署到GitHub Pages..."
    
    # 进入构建目录
    cd examples/playground/dist
    
    # 初始化git仓库
    git init
    git add -A
    git commit -m "Deploy demo to GitHub Pages"
    
    # 获取仓库信息
    cd ../../..
    local repo_url=$(git config --get remote.origin.url)
    
    # 推送到gh-pages分支
    cd examples/playground/dist
    git branch -M gh-pages
    git remote add origin "$repo_url"
    git push -f origin gh-pages
    
    cd ../../..
    log_success "部署完成!"
}

# 清理构建产物
cleanup() {
    log_info "清理构建产物..."
    rm -rf examples/playground/dist
    log_success "清理完成"
}

# 获取部署URL
get_deploy_url() {
    local repo_name=$(basename -s .git $(git config --get remote.origin.url))
    local username=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/.*/\1/')
    echo "https://${username}.github.io/${repo_name}/"
}

# 主函数
main() {
    echo "🚀 Vue MathJax Beautiful Demo 部署脚本"
    echo "======================================="
    echo ""
    
    check_git_status
    check_branch
    install_dependencies
    build_core
    build_demo
    
    echo ""
    log_warning "即将部署示例到GitHub Pages"
    local deploy_url=$(get_deploy_url)
    log_info "部署URL: $deploy_url"
    echo ""
    
    read -p "确认部署? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_error "部署已取消"
        cleanup
        exit 1
    fi
    
    deploy_to_github_pages
    
    echo ""
    log_success "🎉 部署完成!"
    log_info "访问链接: $deploy_url"
    echo ""
    log_info "注意事项："
    echo "1. GitHub Pages可能需要几分钟才能生效"
    echo "2. 确保仓库设置中启用了GitHub Pages"
    echo "3. 设置源为gh-pages分支"
    
    cleanup
}

# 运行主函数
main "$@" 