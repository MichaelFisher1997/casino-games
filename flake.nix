{
  description = "AWS CLI + Elastic Beanstalk CLI devShell with zsh (pip install eb)";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-darwin" "x86_64-darwin" ];
    in {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs {
            system = system;
            config = { allowUnfree = true; };
          };
        in {
          default = pkgs.mkShell {
            buildInputs = [
              pkgs.awscli2
              pkgs.python312
              pkgs.terraform
              pkgs.jq
              pkgs.hcp
              pkgs.zsh
            ];
            shellHook = ''
              # Make a venv in the project dir (if not already)
              if [ ! -d .venv ]; then
                echo "Creating Python venv for awsebcli..."
                python3 -m venv .venv
                . .venv/bin/activate
                pip install --upgrade pip
                pip install awsebcli
              else
                . .venv/bin/activate
              fi
              export PATH="$PWD/.venv/bin:$PATH"
              export SHELL=${pkgs.zsh}/bin/zsh
              export AWS_PAGER=""
              # Start zsh if not already in it
              if [ -z "$IN_NIX_SHELL_ZSH" ]; then
                export IN_NIX_SHELL_ZSH=1
                exec ${pkgs.zsh}/bin/zsh -i
              fi
            '';
          };
        }
      );
    };
}

