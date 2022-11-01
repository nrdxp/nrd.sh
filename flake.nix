{
  inputs.std.url = "github:divnix/std/nixpkgs-config";
  inputs.nixpkgs.follows = "std/nixpkgs";
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
