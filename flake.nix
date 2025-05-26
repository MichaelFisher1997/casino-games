{
  description = "Slot machine RTP simulator with Bun and TypeScript";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [ pkgs.bun pkgs.nodejs pkgs.typescript ];
          shellHook = ''
            echo "Run: bun run slot.ts"
          '';
        };

        packages.default = pkgs.stdenvNoCC.mkDerivation {
          name = "slot-sim";
          src = ./.;
          buildInputs = [ pkgs.bun pkgs.nodejs pkgs.typescript ];
          buildPhase = "true";
          installPhase = ''
            mkdir -p $out
            cp slot.ts $out/
          '';
          meta.description = "Slot machine RTP simulator in TypeScript";
        };
      });
}

