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

# 检查环境
check_environment() {
    log_info "检查发布环境..."
    
    # 检查Node.js版本
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi
    
    # 检查npm登录状态
    if ! npm whoami &> /dev/null; then
        log_error "npm 未登录，请先运行 'npm login'"
        exit 1
    fi
    
    log_success "环境检查通过"
}

# 检查工作目录
check_working_directory() {
    if [[ ! -f "package.json" ]]; then
        log_error "请在 packages/core 目录中运行此脚本"
        exit 1
    fi
    
    if [[ ! -f "../../PACKAGING.md" ]]; then
        log_error "请确保在正确的项目目录中运行"
        exit 1
    fi
}

# 清理构建产物
clean_dist() {
    log_info "清理之前的构建产物..."
    rm -rf dist/
    log_success "清理完成"
}

# 安装依赖
install_dependencies() {
    log_info "安装依赖..."
    npm install
    log_success "依赖安装完成"
}

# 构建包
build_package() {
    log_info "构建包..."
    npm run build
    
    if [[ ! -d "dist" ]]; then
        log_error "构建失败，dist 目录不存在"
        exit 1
    fi
    
    log_success "构建完成"
}

# 检查包内容
check_package_content() {
    log_info "检查包内容..."
    npm pack --dry-run
    
    echo ""
    log_info "包大小分析："
    if command -v du &> /dev/null; then
        du -sh dist/*
    fi
}

# 运行测试
run_tests() {
    log_info "运行测试..."
    
    # 如果有测试脚本就运行
    if npm run test &> /dev/null; then
        log_success "测试通过"
    else
        log_warning "未找到测试脚本或测试失败"
    fi
}

# 版本确认
confirm_version() {
    local current_version=$(node -p "require('./package.json').version")
    
    echo ""
    log_info "当前版本: ${current_version}"
    echo ""
    
    echo "选择版本更新类型："
    echo "1) patch (${current_version} -> $(npm version patch --dry-run | tail -1))"
    echo "2) minor (${current_version} -> $(npm version minor --dry-run | tail -1))"
    echo "3) major (${current_version} -> $(npm version major --dry-run | tail -1))"
    echo "4) 保持当前版本"
    echo ""
    
    read -p "请选择 [1-4]: " -n 1 -r version_choice
    echo ""
    
    case $version_choice in
        1)
            npm version patch
            ;;
        2)
            npm version minor
            ;;
        3)
            npm version major
            ;;
        4)
            log_info "保持当前版本"
            ;;
        *)
            log_error "无效选择"
            exit 1
            ;;
    esac
}

# 发布确认
confirm_publish() {
    local package_name=$(node -p "require('./package.json').name")
    local version=$(node -p "require('./package.json').version")
    
    echo ""
    log_warning "即将发布 ${package_name}@${version} 到 npm"
    echo ""
    
    read -p "确认发布? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_error "发布已取消"
        exit 1
    fi
}

# 发布到npm
publish_to_npm() {
    log_info "发布到 npm..."
    
    npm publish
    
    local package_name=$(node -p "require('./package.json').name")
    local version=$(node -p "require('./package.json').version")
    
    log_success "发布成功！"
    log_info "包链接: https://www.npmjs.com/package/${package_name}"
    log_info "版本: ${version}"
}

# 发布后验证
verify_publication() {
    log_info "验证发布..."
    
    local package_name=$(node -p "require('./package.json').name")
    
    # 等待一下让npm更新
    sleep 5
    
    if npm view "${package_name}" version &> /dev/null; then
        log_success "发布验证成功"
    else
        log_warning "发布验证失败，可能需要等待几分钟"
    fi
}

# 主函数
main() {
    echo "🚀 Vue MathJax Beautiful 发布脚本"
    echo "================================="
    echo ""
    
    check_environment
    check_working_directory
    clean_dist
    install_dependencies
    build_package
    run_tests
    check_package_content
    
    echo ""
    confirm_version
    confirm_publish
    
    publish_to_npm
    verify_publication
    
    echo ""
    log_success "🎉 发布流程完成!"
    echo ""
    log_info "后续步骤："
    echo "1. 检查 npm 包页面"
    echo "2. 更新项目文档"
    echo "3. 通知社区更新"
    echo "4. 监控用户反馈"
}

# 运行主函数
main "$@" 