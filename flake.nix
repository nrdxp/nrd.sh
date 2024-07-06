{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  inputs.std.url = "github:divnix/std/v0.23.2";
  inputs.std.inputs.nixpkgs.follows = "nixpkgs";
  outputs = inputs @ {std, ...}:
    std.growOn {
      inherit inputs;
      nixpkgsConfig.allowUnfree = true;
      systems = ["x86_64-linux"];
      cellsFrom = ./nix;
      cellBlocks = [
        (std.installables "packages")
        (std.devshells "devshells")
      ];
    };
}
