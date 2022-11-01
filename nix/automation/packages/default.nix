{
  inputs,
  cell,
}: {
  inherit (inputs.nixpkgs.callPackage ./astro {}) astro;
}
