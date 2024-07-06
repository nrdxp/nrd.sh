{
  inputs,
  cell,
}: let
  inherit (inputs.nixpkgs) pkgs;
  inherit (inputs) std;
in {
  default = std.lib.dev.mkShell {
    name = "nrd.sh";
    imports = [std.std.devshellProfiles.default];
    commands = [
      {package = cell.packages.astro;}
      {package = pkgs.nodejs_latest;}
      {package = pkgs.nodePackages_latest.node2nix;}
      {package = pkgs.nodePackages_latest.svgo;}
      {package = pkgs.nodePackages_latest.yarn;}
      {package = pkgs.pngcrush;}
      {package = pkgs.libwebp;}
      {package = pkgs.netlify-cli;}
    ];
  };
}
