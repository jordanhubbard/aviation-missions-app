// Aviation Mission Management - Pure JavaScript Frontend
// Modern ES6+ implementation with clean architecture

class AviationMissionApp {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8080';
        this.missions = [];
        this.filteredMissions = [];
        this.filters = {
            search: '',
            category: 'all',
            difficulty: 'all',
            pilot_experience: 'all'
        };
        this.isLoading = true;
        this.error = null;
        this.currentView = 'missions'; // 'missions' or 'admin'
        
        // Admin state
        this.adminToken = localStorage.getItem('adminToken');
        this.adminEmail = localStorage.getItem('adminEmail');
        this.adminName = localStorage.getItem('adminName');
        this.isAdmin = false;

        console.log('🚀 Aviation Mission App initializing...');
        this.init();
    }

    async init() {
        try {
            this.createAppStructure();
            this.bindEventListeners();
            if (this.adminToken) {
                await this.checkAdminStatus();
            }
            await this.loadMissions();
            this.render();
            console.log('✅ Aviation Mission App initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            this.showError('Failed to initialize application');
        }
    }

    createAppStructure() {
        const app = document.getElementById('app');
        if (!app) {
            throw new Error('App container not found');
        }

        app.innerHTML = `
            <div class="app-container">
                <header class="app-header">
                    <div class="header-content">
                        <div class="header-title">
                            <h1>✈️ Aviation Mission Management</h1>
                            <p>Manage and track aviation missions</p>
                        </div>
                        <div class="header-actions">
                            <button id="adminLoginBtn" class="btn-admin-login">
                                <span class="admin-icon">🔐</span>
                                <span id="adminBtnText">Admin Login</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div class="filters-panel" id="filtersPanel" style="display: none;">
                    <div class="search-container">
                        <input type="text" id="searchInput" placeholder="Search missions by title, description, or route..." />
                    </div>
                    <div class="filter-container">
                        <label>Category:</label>
                        <select id="categoryFilter">
                            <option value="all">All Categories</option>
                        </select>
                    </div>
                    <div class="filter-container">
                        <label>Difficulty:</label>
                        <select id="difficultyFilter">
                            <option value="all">All Difficulties</option>
                            <option value="1">1 - Easy</option>
                            <option value="2">2 - Medium</option>
                            <option value="3">3 - Hard</option>
                            <option value="4">4 - Hard</option>
                            <option value="5">5 - Hard</option>
                            <option value="6">6 - Expert</option>
                            <option value="7">7 - Expert</option>
                            <option value="8">8 - Expert</option>
                            <option value="9">9 - Expert</option>
                        </select>
                    </div>
                    <div class="filter-container">
                        <label>Pilot Experience:</label>
                        <select id="experienceFilter">
                            <option value="all">All Experience Levels</option>
                        </select>
                    </div>
                    <div class="fab" onclick="app.showNewMissionForm()">
                        <span class="fab-icon">✈️</span>
                        <span class="fab-label">Create Mission</span>
                    </div>
                </div>

                <div class="content-area" id="contentArea">
                    <div class="loading-indicator" id="loadingIndicator">
                        <div class="spinner"></div>
                        <p>Loading missions...</p>
                    </div>

                    <div class="error-display" id="errorDisplay" style="display: none;">
                        <h3>Error</h3>
                        <p id="errorMessage"></p>
                        <button id="retryBtn" class="btn btn-secondary">Retry</button>
                    </div>

                    <div class="missions-grid" id="missionsGrid" style="display: none;"></div>
                    
                    <div class="admin-dashboard" id="adminDashboard" style="display: none;"></div>
                </div>
                
                <!-- Admin Login Modal -->
                <div id="adminModal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <span class="close" id="modalClose">&times;</span>
                        <div id="modalBody"></div>
                    </div>
                </div>

                <!-- Success sentinel for testing -->
                <div id="app-loaded-sentinel" style="position: fixed; top: -1000px; left: -1000px; opacity: 0; pointer-events: none;">
                    <!-- AVIATION_MISSIONS_APP_FULLY_LOADED -->
                </div>
            </div>
        `;
    }

    bindEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.filterMissions();
        });

        // Filter dropdowns
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.filterMissions();
        });

        const difficultyFilter = document.getElementById('difficultyFilter');
        difficultyFilter.addEventListener('change', (e) => {
            this.filters.difficulty = e.target.value;
            this.filterMissions();
        });

        const experienceFilter = document.getElementById('experienceFilter');
        experienceFilter.addEventListener('change', (e) => {
            this.filters.pilot_experience = e.target.value;
            this.filterMissions();
        });

        const retryBtn = document.getElementById('retryBtn');
        retryBtn.addEventListener('click', () => this.loadMissions());
        
        // Admin button
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        adminLoginBtn.addEventListener('click', () => this.handleAdminButtonClick());
        
        // Modal close button
        const modalClose = document.getElementById('modalClose');
        modalClose.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        const modal = document.getElementById('adminModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    async loadMissions() {
        console.log('📡 Loading missions from API...');
        this.isLoading = true;
        this.error = null;
        this.updateLoadingState();

        try {
            const response = await fetch(`${this.apiBaseUrl}/missions`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.missions = data.missions || [];
            this.filteredMissions = [...this.missions];
            this.isLoading = false;

            console.log(`✅ Loaded ${this.missions.length} missions`);
            this.populateFilterOptions();
            this.render();

        } catch (error) {
            console.error('❌ Failed to load missions:', error);
            this.isLoading = false;
            this.error = error.message;
            this.updateLoadingState();
        }
    }

    populateFilterOptions() {
        // Populate category filter
        const categories = [...new Set(this.missions.map(m => m.category).filter(Boolean))].sort();
        const categoryFilter = document.getElementById('categoryFilter');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Populate difficulty filter with only existing levels
        const difficulties = [...new Set(this.missions.map(m => m.difficulty).filter(d => d != null))].sort((a, b) => a - b);
        const difficultyFilter = document.getElementById('difficultyFilter');
        // Clear existing options except "All Difficulties"
        difficultyFilter.innerHTML = '<option value="all">All Difficulties</option>';
        difficulties.forEach(difficulty => {
            const option = document.createElement('option');
            option.value = difficulty;
            option.textContent = `${difficulty} - ${this.getDifficultyLabel(difficulty)}`;
            difficultyFilter.appendChild(option);
        });

        // Populate experience filter
        const experiences = [...new Set(this.missions.map(m => m.pilot_experience).filter(Boolean))].sort();
        const experienceFilter = document.getElementById('experienceFilter');
        experiences.forEach(experience => {
            const option = document.createElement('option');
            option.value = experience;
            option.textContent = experience;
            experienceFilter.appendChild(option);
        });
    }

    filterMissions() {
        console.log('🔍 Filtering missions with:', this.filters);

        this.filteredMissions = this.missions.filter(mission => {
            // Category filter
            if (this.filters.category !== 'all' && mission.category !== this.filters.category) {
                return false;
            }

            // Difficulty filter
            if (this.filters.difficulty !== 'all' && String(mission.difficulty) !== this.filters.difficulty) {
                return false;
            }

            // Pilot experience filter
            if (this.filters.pilot_experience !== 'all' && mission.pilot_experience !== this.filters.pilot_experience) {
                return false;
            }

            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const titleMatch = mission.title && mission.title.toLowerCase().includes(searchTerm);
                const descMatch = mission.mission_description && mission.mission_description.toLowerCase().includes(searchTerm);
                const objMatch = mission.objective && mission.objective.toLowerCase().includes(searchTerm);
                const routeMatch = mission.route && mission.route.toLowerCase().includes(searchTerm);
                const categoryMatch = mission.category && mission.category.toLowerCase().includes(searchTerm);

                if (!titleMatch && !descMatch && !objMatch && !routeMatch && !categoryMatch) {
                    return false;
                }
            }

            return true;
        });

        console.log(`📊 Filtered to ${this.filteredMissions.length} missions`);
        this.renderMissions();
    }

    updateLoadingState() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const errorDisplay = document.getElementById('errorDisplay');
        const missionsGrid = document.getElementById('missionsGrid');
        const filtersPanel = document.getElementById('filtersPanel');

        if (this.isLoading) {
            loadingIndicator.style.display = 'flex';
            errorDisplay.style.display = 'none';
            missionsGrid.style.display = 'none';
            filtersPanel.style.display = 'none';
        } else if (this.error) {
            loadingIndicator.style.display = 'none';
            errorDisplay.style.display = 'block';
            missionsGrid.style.display = 'none';
            filtersPanel.style.display = 'none';
            document.getElementById('errorMessage').textContent = this.error;
        } else {
            loadingIndicator.style.display = 'none';
            errorDisplay.style.display = 'none';
            missionsGrid.style.display = 'grid';
            filtersPanel.style.display = 'flex';
        }
    }

    render() {
        this.updateLoadingState();

        if (!this.isLoading && !this.error) {
            this.renderMissions();
        }
    }

    renderMissions() {
        const missionsGrid = document.getElementById('missionsGrid');

        if (this.filteredMissions.length === 0) {
            missionsGrid.innerHTML = `
                <div class="empty-state">
                    <p>No missions found matching your criteria.</p>
                </div>
            `;
            return;
        }

        const missionsHTML = this.filteredMissions.map(mission => this.renderMissionCard(mission)).join('');
        missionsGrid.innerHTML = missionsHTML;
    }

    renderMissionCard(mission) {
        const difficultyLevel = mission.difficulty || 1;
        const challenges = this.analyzeMissionChallenges(mission);
        const experienceLevel = this.formatExperienceLevel(mission.pilot_experience);

        return `
            <div class="mission-card" data-mission-id="${mission.id}" onclick="app.viewMission(${mission.id})">
                <!-- Mission Header -->
                <div class="mission-header">
                    <h3 class="mission-title">${this.escapeHtml(mission.title)}</h3>
                    <div class="mission-meta">
                        <span class="category-badge">${this.escapeHtml(mission.category)}</span>
                        <span class="difficulty-badge badge-difficulty-${difficultyLevel}">
                            ${this.getDifficultyLabel(difficultyLevel)}
                        </span>
                        <span class="experience-badge">${experienceLevel}</span>
                    </div>
                </div>

                <!-- Mission Content -->
                <div class="mission-content">
                    <div class="mission-data-grid">
                        <span class="mission-data-label">ROUTE:</span>
                        <span class="mission-data-value">${this.escapeHtml(mission.route || 'See description')}</span>

                        <span class="mission-data-label">OBJECTIVE:</span>
                        <span class="mission-data-value">${this.escapeHtml(mission.objective || mission.mission_description)}</span>

                        <span class="mission-data-label">DESCRIPTION:</span>
                        <span class="mission-data-value">${this.escapeHtml(mission.mission_description)}</span>
                    </div>

                    ${challenges.length > 0 ? this.renderChallenges(challenges) : ''}

                    ${mission.notes ? `
                    <div class="mission-section">
                        <h4>Notes</h4>
                        <p>${this.escapeHtml(mission.notes)}</p>
                    </div>
                    ` : ''}

                    ${mission.special_challenges ? `
                    <div class="mission-section">
                        <h4>Special Challenges</h4>
                        <p>${this.escapeHtml(mission.special_challenges)}</p>
                    </div>
                    ` : ''}
                </div>

                <!-- Mission Footer -->
                <div class="mission-footer">
                    <div class="pilot-experience">MIN EXP: ${experienceLevel}</div>

                    <div class="mission-stats">
                        <div class="stat-item">
                            <span class="stat-icon">💬</span>
                            <span class="stat-count">${mission.comment_count || 0}</span>
                            <span class="stat-label">Comments</span>
                        </div>

                        <div class="stat-item">
                            <span class="stat-icon">✓</span>
                            <span class="stat-count">${mission.completion_count || 0}</span>
                            <span class="stat-label">Completed</span>
                        </div>

                        <button class="btn-mission primary" onclick="event.stopPropagation(); app.viewMission(${mission.id})">
                            BRIEF
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    analyzeMissionChallenges(mission) {
        const challenges = [];
        const description = (mission.mission_description || '').toLowerCase();
        const route = (mission.route || '').toLowerCase();
        const title = (mission.title || '').toLowerCase();
        const notes = (mission.notes || '').toLowerCase();
        const allText = `${description} ${route} ${title} ${notes}`;

        // High DA challenges
        if (allText.includes('density altitude') || allText.includes('high altitude') ||
            allText.includes('mountain') || allText.includes('sierra') ||
            allText.includes('truckee') || allText.includes('tahoe')) {
            challenges.push({ type: 'high-da', label: 'High DA' });
        }

        // Mountain Flying
        if ((allText.includes('mountain') && (allText.includes('flying') || allText.includes('terrain'))) ||
            allText.includes('sierra')) {
            challenges.push({ type: 'mountain-flying', label: 'Mountain Flying' });
        }

        // Complex Airspace
        if (allText.includes('class b') || allText.includes('class c') ||
            allText.includes('bravo') || allText.includes('charlie') ||
            allText.includes('clearance') || allText.includes('atc')) {
            challenges.push({ type: 'complex-airspace', label: 'Complex Airspace' });
        }

        // Short Runway
        if (allText.includes('short') || allText.includes('0q5') ||
            allText.includes('shelter cove')) {
            challenges.push({ type: 'short-runway', label: 'Short Runway' });
        }

        // Time Restrictions
        if (allText.includes('time') || allText.includes('morning departure') ||
            allText.includes('afternoon') || allText.includes('busy')) {
            challenges.push({ type: 'time-restrictions', label: 'Time Restrictions' });
        }

        return challenges;
    }

    renderChallenges(challenges) {
        return `
            <div class="challenges-section">
                <h4>FLIGHT CHALLENGES</h4>
                <div class="challenges-grid">
                    ${challenges.map(challenge => `
                        <div class="challenge-item">
                            <span class="challenge-icon">⚠</span>
                            <span class="challenge-label">${challenge.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getDifficultyLabel(level) {
        if (level <= 1) return 'EASY';
        if (level <= 2) return 'MEDIUM';
        if (level <= 5) return 'HARD';
        return 'EXPERT';
    }

    formatExperienceLevel(experience) {
        if (!experience) return 'STUDENT';
        const exp = experience.toLowerCase();
        if (exp.includes('beginner')) return 'STUDENT';
        if (exp.includes('intermediate')) return 'PRIVATE';
        if (exp.includes('advanced')) return 'COMMERCIAL';
        return 'STUDENT';
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            return 'Invalid Date';
        }
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        this.error = message;
        this.render();
    }

    // Mission actions
    viewMission(id) {
        console.log('👁️ View mission:', id);
        // TODO: Implement mission detail view
    }

    editMission(id) {
        console.log('✏️ Edit mission:', id);
        // TODO: Implement mission editing
    }

    async deleteMission(id) {
        if (!confirm('Are you sure you want to delete this mission?')) {
            return;
        }

        console.log('🗑️ Delete mission:', id);

        try {
            const response = await fetch(`${this.apiBaseUrl}/missions/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            console.log('✅ Mission deleted successfully');
            await this.loadMissions(); // Reload the list
        } catch (error) {
            console.error('❌ Failed to delete mission:', error);
            alert('Failed to delete mission: ' + error.message);
        }
    }

    showNewMissionForm() {
        console.log('➕ Show new mission form');
        // TODO: Implement new mission form
    }

    // ===== ADMIN METHODS =====

    async checkAdminStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/admin/status`, {
                headers: {
                    'Authorization': `Bearer ${this.adminToken}`
                }
            });
            
            const data = await response.json();
            if (data.is_admin) {
                this.isAdmin = true;
                this.adminEmail = data.email || data.admin_name;
                this.adminName = data.admin_name;
                this.updateAdminButton();
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Failed to check admin status:', error);
            this.logout();
        }
    }

    handleAdminButtonClick() {
        if (this.isAdmin) {
            if (this.currentView === 'admin') {
                this.currentView = 'missions';
                this.render();
            } else {
                this.showAdminDashboard();
            }
        } else {
            this.showAdminLoginForm();
        }
    }

    showAdminLoginForm() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Admin Login</h2>
            <form id="adminLoginForm">
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" id="adminEmail" required />
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" id="adminPassword" required />
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `;
        
        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.adminLogin();
        });
        
        document.getElementById('adminModal').style.display = 'block';
    }

    showPasswordSetupForm() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Set Your Password</h2>
            <p>Welcome! Please set your admin password (minimum 8 characters)</p>
            <form id="passwordSetupForm">
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" id="setupEmail" value="${this.adminEmail}" readonly />
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" id="setupPassword" minlength="8" required />
                </div>
                <div class="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" id="setupPasswordConfirm" minlength="8" required />
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Set Password</button>
                </div>
            </form>
        `;
        
        document.getElementById('passwordSetupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.setupPassword();
        });
        
        document.getElementById('adminModal').style.display = 'block';
    }

    async adminLogin() {
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (data.first_login) {
                    // First time login - need to set password
                    this.adminEmail = data.email;
                    this.adminName = data.name;
                    this.showPasswordSetupForm();
                } else {
                    // Regular login success
                    this.adminToken = data.token;
                    this.adminEmail = data.email;
                    this.adminName = data.name;
                    this.isAdmin = true;
                    
                    localStorage.setItem('adminToken', this.adminToken);
                    localStorage.setItem('adminEmail', this.adminEmail);
                    localStorage.setItem('adminName', this.adminName);
                    
                    this.closeModal();
                    this.updateAdminButton();
                    this.showAdminDashboard();
                }
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        }
    }

    async setupPassword() {
        const password = document.getElementById('setupPassword').value;
        const confirmPassword = document.getElementById('setupPasswordConfirm').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/admin/setup-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.adminEmail, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.adminToken = data.token;
                this.isAdmin = true;
                
                localStorage.setItem('adminToken', this.adminToken);
                localStorage.setItem('adminEmail', this.adminEmail);
                localStorage.setItem('adminName', this.adminName);
                
                alert('Password set successfully!');
                this.closeModal();
                this.updateAdminButton();
                this.showAdminDashboard();
            } else {
                alert(data.error || 'Failed to set password');
            }
        } catch (error) {
            console.error('Password setup error:', error);
            alert('Failed to set password: ' + error.message);
        }
    }

    logout() {
        this.adminToken = null;
        this.adminEmail = null;
        this.adminName = null;
        this.isAdmin = false;
        this.currentView = 'missions';
        
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminName');
        
        this.updateAdminButton();
        this.render();
    }

    updateAdminButton() {
        const btnText = document.getElementById('adminBtnText');
        const adminBtn = document.getElementById('adminLoginBtn');
        
        if (this.isAdmin) {
            btnText.textContent = this.adminName || 'Admin';
            adminBtn.classList.add('admin-logged-in');
            
            // Add dropdown menu
            if (!document.getElementById('adminDropdown')) {
                const dropdown = document.createElement('div');
                dropdown.id = 'adminDropdown';
                dropdown.className = 'admin-dropdown';
                dropdown.innerHTML = `
                    <button onclick="app.showAdminDashboard()">Dashboard</button>
                    <button onclick="app.logout()">Logout</button>
                `;
                adminBtn.parentElement.appendChild(dropdown);
            }
        } else {
            btnText.textContent = 'Admin Login';
            adminBtn.classList.remove('admin-logged-in');
            const dropdown = document.getElementById('adminDropdown');
            if (dropdown) dropdown.remove();
        }
    }

    async showAdminDashboard() {
        this.currentView = 'admin';
        const filtersPanel = document.getElementById('filtersPanel');
        const missionsGrid = document.getElementById('missionsGrid');
        const adminDashboard = document.getElementById('adminDashboard');
        
        filtersPanel.style.display = 'none';
        missionsGrid.style.display = 'none';
        adminDashboard.style.display = 'block';
        
        adminDashboard.innerHTML = '<div class="loading-indicator"><div class="spinner"></div><p>Loading admin dashboard...</p></div>';
        
        try {
            // Load submissions
            const submissionsResponse = await fetch(`${this.apiBaseUrl}/submissions`, {
                headers: { 'Authorization': `Bearer ${this.adminToken}` }
            });
            const submissionsData = await submissionsResponse.json();
            
            // Load admin users
            const adminsResponse = await fetch(`${this.apiBaseUrl}/admin/users`, {
                headers: { 'Authorization': `Bearer ${this.adminToken}` }
            });
            const adminsData = await adminsResponse.json();
            
            this.renderAdminDashboard(submissionsData.submissions || [], adminsData.admins || []);
        } catch (error) {
            console.error('Failed to load admin data:', error);
            adminDashboard.innerHTML = '<p class="error">Failed to load admin dashboard</p>';
        }
    }

    renderAdminDashboard(submissions, admins) {
        const adminDashboard = document.getElementById('adminDashboard');
        
        const pendingSubmissions = submissions.filter(s => s.status === 'pending');
        
        adminDashboard.innerHTML = `
            <div class="admin-header">
                <h2>Admin Dashboard</h2>
                <button class="btn btn-secondary" onclick="app.currentView='missions'; app.render()">Back to Missions</button>
            </div>
            
            <div class="admin-sections">
                <section class="admin-section">
                    <h3>Pending Mission Submissions (${pendingSubmissions.length})</h3>
                    <div class="submissions-list">
                        ${pendingSubmissions.length === 0 ? 
                            '<p class="empty-message">No pending submissions</p>' :
                            pendingSubmissions.map(sub => this.renderSubmissionCard(sub)).join('')
                        }
                    </div>
                </section>
                
                <section class="admin-section">
                    <h3>Admin Users (${admins.length})</h3>
                    <button class="btn btn-primary" onclick="app.showAddAdminForm()">Add Admin</button>
                    <div class="admins-list">
                        ${admins.map(admin => `
                            <div class="admin-user-card">
                                <div class="admin-user-info">
                                    <strong>${this.escapeHtml(admin.name)}</strong>
                                    <span>${this.escapeHtml(admin.email)}</span>
                                    ${admin.first_login ? '<span class="badge">First Login Pending</span>' : ''}
                                </div>
                                <button class="btn btn-danger btn-sm" 
                                        onclick="app.deleteAdmin('${admin.email}')"
                                        ${admins.length <= 1 ? 'disabled' : ''}>
                                    Delete
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    renderSubmissionCard(submission) {
        return `
            <div class="submission-card">
                <h4>${this.escapeHtml(submission.title)}</h4>
                <p><strong>Category:</strong> ${this.escapeHtml(submission.category)}</p>
                <p><strong>Difficulty:</strong> ${submission.difficulty}/10</p>
                <p><strong>Submitted by:</strong> ${this.escapeHtml(submission.submitter_name)}</p>
                <p><strong>Description:</strong> ${this.escapeHtml(submission.mission_description)}</p>
                <div class="submission-actions">
                    <button class="btn btn-primary" onclick="app.approveSubmission(${submission.id})">Approve</button>
                    <button class="btn btn-danger" onclick="app.rejectSubmission(${submission.id})">Reject</button>
                </div>
            </div>
        `;
    }

    async approveSubmission(id) {
        if (!confirm('Approve this mission submission?')) return;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/submissions/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${this.adminToken}` }
            });
            
            if (response.ok) {
                alert('Mission approved!');
                await this.loadMissions();
                this.showAdminDashboard();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to approve mission');
            }
        } catch (error) {
            console.error('Approve error:', error);
            alert('Failed to approve mission');
        }
    }

    async rejectSubmission(id) {
        if (!confirm('Reject this mission submission?')) return;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/submissions/${id}/reject`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${this.adminToken}` }
            });
            
            if (response.ok) {
                alert('Mission rejected');
                this.showAdminDashboard();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to reject mission');
            }
        } catch (error) {
            console.error('Reject error:', error);
            alert('Failed to reject mission');
        }
    }

    showAddAdminForm() {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <h2>Add Admin User</h2>
            <form id="addAdminForm">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" id="newAdminName" required />
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" id="newAdminEmail" required />
                </div>
                <p class="info-text">The new admin will set their password on first login.</p>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Add Admin</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `;
        
        document.getElementById('addAdminForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAdmin();
        });
        
        document.getElementById('adminModal').style.display = 'block';
    }

    async addAdmin() {
        const name = document.getElementById('newAdminName').value;
        const email = document.getElementById('newAdminEmail').value;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/admin/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.adminToken}`
                },
                body: JSON.stringify({ name, email })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Admin added successfully!');
                this.closeModal();
                this.showAdminDashboard();
            } else {
                alert(data.error || 'Failed to add admin');
            }
        } catch (error) {
            console.error('Add admin error:', error);
            alert('Failed to add admin');
        }
    }

    async deleteAdmin(email) {
        if (!confirm(`Delete admin ${email}?`)) return;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/admin/users/${encodeURIComponent(email)}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.adminToken}` }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Admin deleted');
                this.showAdminDashboard();
            } else {
                alert(data.error || 'Failed to delete admin');
            }
        } catch (error) {
            console.error('Delete admin error:', error);
            alert('Failed to delete admin');
        }
    }

    closeModal() {
        document.getElementById('adminModal').style.display = 'none';
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 DOM loaded, initializing Aviation Mission App...');
    window.app = new AviationMissionApp();
});