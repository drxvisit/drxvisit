#!/bin/bash

# DrxVisit Production Build Script
# This script builds APK and AAB for production deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    print_success "Node.js $(node --version)"
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed"
        exit 1
    fi
    print_success "pnpm $(pnpm --version)"
    
    # Check EAS CLI
    if ! command -v eas &> /dev/null; then
        print_warning "EAS CLI not found. Installing..."
        npm install -g eas-cli
    fi
    print_success "EAS CLI $(eas --version)"
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed"
        exit 1
    fi
    print_success "Git $(git --version | cut -d' ' -f3)"
}

# Check Expo login
check_expo_login() {
    print_header "Checking Expo Authentication"
    
    if ! eas whoami &> /dev/null; then
        print_warning "Not logged in to Expo"
        print_header "Please log in to Expo"
        eas login
    fi
    
    EXPO_USER=$(eas whoami 2>/dev/null || echo "Unknown")
    print_success "Logged in as: $EXPO_USER"
}

# Install dependencies
install_dependencies() {
    print_header "Installing Dependencies"
    
    if [ -d "node_modules" ]; then
        print_warning "node_modules already exists. Skipping installation."
    else
        pnpm install
        print_success "Dependencies installed"
    fi
}

# Build APK
build_apk() {
    print_header "Building APK for Testing"
    
    print_warning "Starting APK build (this may take 10-15 minutes)..."
    
    eas build --platform android --type apk --profile production
    
    print_success "APK build completed"
}

# Build AAB
build_aab() {
    print_header "Building AAB for Google Play Store"
    
    print_warning "Starting AAB build (this may take 10-15 minutes)..."
    
    eas build --platform android --type app-bundle --profile production-aab
    
    print_success "AAB build completed"
}

# Show build status
show_build_status() {
    print_header "Recent Builds"
    
    eas build:list --limit 5
}

# Main menu
show_menu() {
    echo ""
    print_header "DrxVisit Production Build Menu"
    echo -e "${BLUE}1)${NC} Build APK (for testing)"
    echo -e "${BLUE}2)${NC} Build AAB (for Google Play Store)"
    echo -e "${BLUE}3)${NC} Build Both APK and AAB"
    echo -e "${BLUE}4)${NC} View Build Status"
    echo -e "${BLUE}5)${NC} Exit"
    echo ""
    read -p "Select option (1-5): " choice
}

# Main script
main() {
    print_header "DrxVisit Production Build System"
    
    # Check prerequisites
    check_prerequisites
    
    # Check Expo login
    check_expo_login
    
    # Install dependencies
    install_dependencies
    
    # Show menu and process choice
    while true; do
        show_menu
        
        case $choice in
            1)
                build_apk
                show_build_status
                ;;
            2)
                build_aab
                show_build_status
                ;;
            3)
                build_apk
                echo ""
                build_aab
                show_build_status
                ;;
            4)
                show_build_status
                ;;
            5)
                print_header "Thank you for using DrxVisit Build System"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please select 1-5."
                ;;
        esac
    done
}

# Run main script
main
