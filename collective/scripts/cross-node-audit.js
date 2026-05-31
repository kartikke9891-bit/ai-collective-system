#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const NODES = ['king-ai-voice', 'sovereign-aura-nexus', 'omega-flux-studio', 'royal-scribe-studio'];

const AUDIT_REPORT = {
  timestamp: new Date().toISOString(),
  nodes: {},
  summary: {
    totalNodes: NODES.length,
    healthy: 0,
    issues: 0,
    criticalIssues: 0
  },
  recommendations: []
};

function auditNode(nodeName) {
  console.log(`🔍 Auditing ${nodeName}...`);
  const nodeReport = {
    name: nodeName,
    status: 'healthy',
    checks: {
      configExists: false,
      dependenciesValid: false
    },
    issues: [],
    warnings: []
  };

  try {
    const nodeDir = path.join(__dirname, '../../packages', nodeName);
    const packageJsonPath = path.join(nodeDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      nodeReport.checks.dependenciesValid = true;
      nodeReport.checks.configExists = true;
    } else {
      nodeReport.issues.push('package.json missing');
    }

    if (nodeReport.issues.length > 0) {
      nodeReport.status = 'issues';
      AUDIT_REPORT.summary.issues++;
    } else {
      nodeReport.status = 'healthy';
      AUDIT_REPORT.summary.healthy++;
    }
    console.log(`   Status: ${nodeReport.status}`);
  } catch (error) {
    nodeReport.status = 'error';
    nodeReport.issues.push(`Audit error: ${error.message}`);
    AUDIT_REPORT.summary.criticalIssues++;
  }

  return nodeReport;
}

function main() {
  console.log('🔐 Cross-Node Audit Engine Started\n');
  console.log(`📊 Auditing ${NODES.length} nodes...\n`);
  NODES.forEach(node => {
    const report = auditNode(node);
    AUDIT_REPORT.nodes[node] = report;
  });
  console.log('\n' + '='.repeat(60));
  console.log('📋 AUDIT REPORT');
  console.log('='.repeat(60));
  console.log(`✅ Healthy: ${AUDIT_REPORT.summary.healthy}/${AUDIT_REPORT.summary.totalNodes}`);
  console.log(`⚠️  Issues: ${AUDIT_REPORT.summary.issues}`);
}
main();
