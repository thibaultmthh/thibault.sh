"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const COMMON_COMMANDS = {
  basic: [
    { value: "init", label: "Initialize repository", description: "Create a new Git repository" },
    { value: "clone", label: "Clone repository", description: "Clone a repository into a new directory" },
    { value: "add", label: "Stage files", description: "Add file contents to the index" },
    { value: "commit", label: "Commit changes", description: "Record changes to the repository" },
    { value: "push", label: "Push changes", description: "Update remote refs along with associated objects" },
    { value: "pull", label: "Pull changes", description: "Fetch from and integrate with another repository" },
    { value: "fetch", label: "Fetch changes", description: "Download objects and refs from another repository" },
    { value: "status", label: "Check status", description: "Show the working tree status" },
  ],
  branch: [
    { value: "branch", label: "Branch operations", description: "List, create, or delete branches" },
    { value: "checkout", label: "Switch branches", description: "Switch branches or restore working tree files" },
    { value: "merge", label: "Merge branches", description: "Join two or more development histories together" },
    { value: "rebase", label: "Rebase branches", description: "Reapply commits on top of another base tip" },
    {
      value: "switch",
      label: "Switch branches (new)",
      description: "Switch branches (modern alternative to checkout)",
    },
    { value: "tag", label: "Tag operations", description: "Create, list, delete or verify a tag object" },
  ],
  advanced: [
    { value: "reset", label: "Reset changes", description: "Reset current HEAD to the specified state" },
    { value: "revert", label: "Revert commits", description: "Revert some existing commits" },
    { value: "stash", label: "Stash changes", description: "Stash the changes in a dirty working directory away" },
    {
      value: "cherry-pick",
      label: "Cherry pick commits",
      description: "Apply the changes introduced by some existing commits",
    },
    {
      value: "bisect",
      label: "Binary search",
      description: "Use binary search to find the commit that introduced a bug",
    },
    { value: "worktree", label: "Worktree operations", description: "Manage multiple working trees" },
  ],
  maintenance: [
    {
      value: "gc",
      label: "Garbage collection",
      description: "Clean up unnecessary files and optimize local repository",
    },
    { value: "fsck", label: "File system check", description: "Verify the connectivity and validity of objects" },
    { value: "reflog", label: "Reference logs", description: "Manage reflog information" },
    { value: "remote", label: "Remote operations", description: "Manage set of tracked repositories" },
    { value: "clean", label: "Clean working directory", description: "Remove untracked files from working tree" },
  ],
};

// Extended command options
const getCommandOptions = (command: string) => {
  const commonOptions = {
    verbose: { type: "boolean", label: "Verbose output", description: "Show more detailed output" },
    quiet: { type: "boolean", label: "Quiet mode", description: "Show minimal output" },
  };

  const specificOptions: Record<string, Record<string, { type: string; label: string; description: string }>> = {
    init: {
      "initial-branch": {
        type: "string",
        label: "Initial branch name",
        description: "Override the default branch name",
      },
      shared: {
        type: "boolean",
        label: "Shared repository",
        description: "Specify that the Git repository is to be shared amongst several users",
      },
      template: {
        type: "string",
        label: "Template directory",
        description: "Directory from which templates will be used",
      },
    },
    clone: {
      depth: {
        type: "string",
        label: "Depth",
        description: "Create a shallow clone with a history truncated to the specified number of commits",
      },
      branch: { type: "string", label: "Branch", description: "Checkout specific branch instead of HEAD" },
      "single-branch": { type: "boolean", label: "Single branch", description: "Clone only one branch" },
      recursive: { type: "boolean", label: "Recursive", description: "Initialize submodules in the clone" },
    },
    commit: {
      m: { type: "string", label: "Message", description: "Use the given message as the commit message" },
      amend: { type: "boolean", label: "Amend", description: "Amend previous commit" },
      "no-verify": { type: "boolean", label: "Skip hooks", description: "Skip pre-commit and commit-msg hooks" },
      "allow-empty": { type: "boolean", label: "Allow empty", description: "Allow recording an empty commit" },
      signoff: {
        type: "boolean",
        label: "Sign off",
        description: "Add Signed-off-by line at the end of the commit message",
      },
    },
    push: {
      force: { type: "boolean", label: "Force push", description: "Force push updates" },
      "force-with-lease": {
        type: "boolean",
        label: "Force with lease",
        description: "Force push only if remote ref hasn't changed",
      },
      tags: { type: "boolean", label: "Push tags", description: "Push all tags" },
      delete: { type: "boolean", label: "Delete refs", description: "Delete refs" },
      "set-upstream": { type: "boolean", label: "Set upstream", description: "Set upstream for git pull/status" },
    },
    pull: {
      rebase: {
        type: "boolean",
        label: "Rebase",
        description: "Rebase current branch on top of upstream branch after fetching",
      },
      "no-commit": { type: "boolean", label: "No commit", description: "Don't commit after merge" },
      "no-ff": {
        type: "boolean",
        label: "No fast-forward",
        description: "Create a merge commit even when fast-forward is possible",
      },
      squash: { type: "boolean", label: "Squash", description: "Squash all commits into a single commit" },
    },
    branch: {
      delete: { type: "boolean", label: "Delete", description: "Delete a branch" },
      "force-delete": { type: "boolean", label: "Force delete", description: "Force delete a branch" },
      remotes: { type: "boolean", label: "List remotes", description: "List or delete remote-tracking branches" },
      "show-current": { type: "boolean", label: "Show current", description: "Print the name of the current branch" },
    },
    stash: {
      include: { type: "string", label: "Include", description: "Include untracked or ignored files" },
      message: { type: "string", label: "Message", description: "Stash message" },
      keep_index: { type: "boolean", label: "Keep index", description: "Keep the index intact" },
      "include-untracked": { type: "boolean", label: "Include untracked", description: "Include untracked files" },
    },
    reset: {
      hard: { type: "boolean", label: "Hard reset", description: "Reset working tree and index (dangerous)" },
      soft: { type: "boolean", label: "Soft reset", description: "Keep working tree and index" },
      mixed: { type: "boolean", label: "Mixed reset", description: "Keep working tree but reset index" },
    },
  };

  return {
    ...(specificOptions[command] || {}),
    ...(command !== "status" ? commonOptions : {}), // Don't add common options to 'status'
  };
};

export default function GitCommandGenerator() {
  const [baseCommand, setBaseCommand] = useState("init");
  const [options, setOptions] = useState<Record<string, boolean | string>>({});
  const [customParams, setCustomParams] = useState("");
  const [recentCommands, setRecentCommands] = useState<string[]>([]);

  const buildCommand = () => {
    if (!baseCommand) return "";

    let command = `git ${baseCommand}`;

    Object.entries(options).forEach(([key, value]) => {
      if (value === true) {
        command += ` --${key}`;
      } else if (typeof value === "string" && value) {
        command += ` --${key} "${value}"`;
      }
    });

    if (customParams) {
      command += ` ${customParams}`;
    }

    return command;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add to recent commands if not already present
    setRecentCommands((prev) => {
      const newCommands = [text, ...prev.filter((cmd) => cmd !== text)].slice(0, 5);
      return newCommands;
    });
  };

  const getCommandDescription = (value: string) => {
    for (const category of Object.values(COMMON_COMMANDS)) {
      const command = category.find((cmd) => cmd.value === value);
      if (command) return command.description;
    }
    return "";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Git Command Generator</h1>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Command Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Select Command</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getCommandDescription(baseCommand)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              defaultValue="init"
              onValueChange={(value) => {
                setBaseCommand(value);
                setOptions({});
                setCustomParams("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a git command" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(COMMON_COMMANDS).map(([category, commands]) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
                    {commands.map((cmd) => (
                      <SelectItem key={cmd.value} value={cmd.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{cmd.label}</span>
                          <span className="text-xs text-muted-foreground">git {cmd.value}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Command Options */}
          {baseCommand && (
            <div className="space-y-4">
              <Label>Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(getCommandOptions(baseCommand)).map(([key, option]) => (
                  <div key={key} className="flex items-center gap-2">
                    {option.type === "boolean" ? (
                      <Checkbox
                        id={key}
                        checked={!!options[key]}
                        onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, [key]: checked }))}
                      />
                    ) : (
                      <Input
                        id={key}
                        placeholder={option.label}
                        value={(options[key] as string) || ""}
                        onChange={(e) => setOptions((prev) => ({ ...prev, [key]: e.target.value }))}
                      />
                    )}
                    <div className="flex-1">
                      <Label htmlFor={key} className="flex items-center gap-2">
                        {option.label}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{option.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Parameters */}
          {baseCommand && (
            <div className="space-y-2">
              <Label>Additional Parameters</Label>
              <Input
                placeholder="e.g., origin main"
                value={customParams}
                onChange={(e) => setCustomParams(e.target.value)}
              />
            </div>
          )}

          {/* Generated Command */}
          {baseCommand && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Command</Label>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(buildCommand())}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-auto">
                <code>{buildCommand()}</code>
              </pre>
            </div>
          )}

          {/* Recent Commands */}
          {recentCommands.length > 0 && (
            <div className="space-y-2">
              <Label>Recent Commands</Label>
              <div className="space-y-2">
                {recentCommands.map((cmd, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-lg">
                    <code className="text-sm">{cmd}</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(cmd)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Help Card */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">Git Command Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Basic Usage</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Select a base command from the dropdown menu</li>
              <li>Configure available options for the selected command</li>
              <li>Add any additional parameters if needed</li>
              <li>Copy the generated command to use in your terminal</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Hover over the help icons to see detailed descriptions</li>
              <li>Recent commands are saved for quick access</li>
              <li>Use the additional parameters field for custom arguments</li>
              <li>Options are grouped by command type for easier navigation</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
