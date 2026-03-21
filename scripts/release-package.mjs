import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const usage = [
  'Usage:',
  '  pnpm release:package',
  '  pnpm release:package -- dry-run',
  '',
  'Behavior:',
  '  pnpm release:package',
  '  Starts the standard Changesets prompt, then runs versioning, build, and publish.',
  '',
  'Dry run:',
  '  pnpm release:package -- dry-run'
].join('\n');

function quoteWindowsArg(arg) {
  if (!/[\s"]/u.test(arg)) {
    return arg;
  }

  return `"${arg.replace(/"/g, '\\"')}"`;
}

function runPnpm(commandArgs, options) {
  if (process.platform === 'win32') {
    const commandLine = ['pnpm', ...commandArgs].map(quoteWindowsArg).join(' ');
    return spawnSync('cmd.exe', ['/d', '/s', '/c', commandLine], options);
  }

  return spawnSync('pnpm', commandArgs, options);
}

async function main() {
  const rootDir = process.cwd();
  const changesetDir = resolve(rootDir, '.changeset');
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const isDryRun = args.includes('--dry-run') || args.includes('dry-run') || args.includes('dry');
  const wantsHelp = args.includes('--help') || args.includes('-h');
  const unsupportedArgs = args.filter(
    (arg) => !['--dry-run', '--help', '-h', 'dry-run', 'dry'].includes(arg)
  );

  if (wantsHelp) {
    console.log(usage);
    return;
  }

  if (unsupportedArgs.length > 0) {
    throw new Error(`Unsupported arguments: ${unsupportedArgs.join(', ')}\n\n${usage}`);
  }

  if (!existsSync(changesetDir)) {
    throw new Error('Missing .changeset directory in the current workspace.');
  }

  const releaseEnv = { ...process.env };

  if (!releaseEnv.GITHUB_TOKEN && releaseEnv.NODE_AUTH_TOKEN) {
    releaseEnv.GITHUB_TOKEN = releaseEnv.NODE_AUTH_TOKEN;
  }

  if (!releaseEnv.NODE_AUTH_TOKEN && releaseEnv.GITHUB_TOKEN) {
    releaseEnv.NODE_AUTH_TOKEN = releaseEnv.GITHUB_TOKEN;
  }

  if (!releaseEnv.GITHUB_TOKEN || !releaseEnv.NODE_AUTH_TOKEN) {
    throw new Error(
      'Set NODE_AUTH_TOKEN or GITHUB_TOKEN before running release:package. The script reuses one token for both variables when only one is present.'
    );
  }

  const commands = [
    ['exec', 'changeset'],
    ['exec', 'changeset', 'version'],
    ['build'],
    ['exec', 'changeset', 'publish']
  ];

  if (isDryRun) {
    console.log('Dry run enabled. The following commands would be executed:');
    for (const commandArgs of commands) {
      console.log(`- pnpm ${commandArgs.join(' ')}`);
    }
    return;
  }

  for (const commandArgs of commands) {
    const result = runPnpm(commandArgs, {
      cwd: rootDir,
      stdio: 'inherit',
      env: releaseEnv
    });

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});