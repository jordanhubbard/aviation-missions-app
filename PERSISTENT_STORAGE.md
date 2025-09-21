# Persistent Storage Guide

This document explains how persistent storage is implemented in the Aviation Mission Management system to prevent data loss during container rebuilds.

## 📁 Storage Architecture

### Database Location
- **Type**: H2 Database (embedded SQL database)
- **Container Path**: `/app/data/aviation-missions.*`
- **Host Path**: `./data/aviation-missions.*` (mounted volume)

### Files Stored
```
./data/
├── aviation-missions.mv.db    # Main H2 database file
└── aviation-missions.trace.db # H2 trace/log file (optional)
```

## 🔧 Configuration

### Docker Compose Volume Mount
```yaml
volumes:
  # Persistent database storage - survives container rebuilds
  - ./data:/app/data:rw
  # Optional: Backup directory for database exports
  - ./backups:/app/backups:rw
```

### Environment Variables
```yaml
environment:
  # Ensure database is stored in persistent volume
  - DATABASE_URL=./data/aviation-missions
```

## 💾 Data Persistence

### What Survives Container Rebuilds
✅ **Persisted Data:**
- User-submitted missions
- Mission comments and ratings
- Mission completion records
- Admin sessions
- All database schema and indexes

### What Gets Recreated
🔄 **Recreated on Startup:**
- Original missions from `missions.txt` (only if database is empty)
- Application logs
- Temporary files

## 🗄️ Backup & Restore

### Creating Backups
```bash
# Create a timestamped backup
make backup

# Manual backup (if needed)
./scripts/backup-database.sh
```

### Restoring from Backup
```bash
# Restore from a specific backup file
make restore BACKUP_FILE=backups/aviation-missions-backup-20240921_143022.tar.gz
```

### Backup File Structure
```
backups/
└── aviation-missions-backup-YYYYMMDD_HHMMSS.tar.gz
    ├── aviation-missions.mv.db
    ├── aviation-missions.trace.db (if exists)
    └── backup-info.txt
```

## 🚀 Production Deployment

### Local Development
The current setup with `./data:/app/data` works perfectly for local development and testing.

### Production Considerations

#### Option 1: Named Docker Volume
```yaml
volumes:
  - aviation_missions_data:/app/data
volumes:
  aviation_missions_data:
    driver: local
```

#### Option 2: External Database
```yaml
environment:
  - DATABASE_URL=postgresql://user:pass@host:5432/aviation_missions
```

#### Option 3: Cloud Storage Mount
```yaml
volumes:
  - /mnt/cloud-storage/aviation-missions:/app/data
```

## 🔍 Monitoring Storage

### Check Database Size
```bash
# View database files
ls -lh data/

# Check disk usage
du -sh data/
```

### View Database Contents (if needed)
```bash
# Connect to H2 database (requires H2 tools)
java -cp h2.jar org.h2.tools.Shell -url jdbc:h2:./data/aviation-missions -user sa
```

## 🛡️ Data Safety

### Automatic Protections
- Database files are stored outside the container
- Container rebuilds don't affect data
- Graceful shutdown preserves database integrity

### Manual Protections
- Regular backups with `make backup`
- Version control excludes data files (`.gitignore`)
- Backup files are compressed and timestamped

### Recovery Scenarios

#### Container Corruption
```bash
make stop
make clean
make start  # Data survives in ./data/
```

#### Accidental Data Loss
```bash
make restore BACKUP_FILE=backups/latest-backup.tar.gz
```

#### Migration to New Server
```bash
# On old server
make backup

# On new server
scp old-server:backups/backup.tar.gz ./backups/
make restore BACKUP_FILE=backups/backup.tar.gz
```

## 📊 Storage Requirements

### Typical Database Sizes
- **Fresh Install**: ~100KB (schema + seed data)
- **Active Use (100 missions)**: ~1-5MB
- **Heavy Use (1000+ missions)**: ~10-50MB

### Backup Storage
- **Compressed Backups**: ~10-20% of database size
- **Retention**: Keep last 30 days of backups (~1GB max)

## 🔧 Troubleshooting

### Database Won't Start
```bash
# Check file permissions
ls -la data/
chmod 666 data/aviation-missions.*

# Check disk space
df -h
```

### Backup Fails
```bash
# Check backup directory permissions
mkdir -p backups
chmod 755 backups

# Manual backup
cp data/aviation-missions.* backups/manual-backup-$(date +%Y%m%d)/
```

### Restore Fails
```bash
# Verify backup file
tar -tzf backups/backup-file.tar.gz

# Manual restore
make stop
tar -xzf backups/backup-file.tar.gz -C ./
cp backup-folder/* data/
make start
```

---

**Note**: This persistent storage setup ensures your aviation mission data is safe and survives container rebuilds, deployments, and system updates! 🛡️✈️
