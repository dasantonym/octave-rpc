function res = rpc (json)

  # https://github.com/fangq/jsonlab#loadjsonm
  req = loadjson (json, "FastArrayParser", 1);

  try
    _ = req.version;
  catch
    req.version = "1.1";
  end

  try
    _ = req.id;
  catch
    req.id = "-1";
  end

  applied = apply_func (req.method, req.params);
  packed = pack_args (applied);

  res = savejson ("res", struct (
    "result", packed,
    "version", req.version,
    "id", req.id
  ), "Compact", 1);

endfunction
