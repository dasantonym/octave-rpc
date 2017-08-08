function res = rpc (json)
  req = loadjson (json, "FastArrayParser", 1);

  try
    _ = req.version;
  catch ERR
    req.version = "1.1";
  end

  try
    _ = req.id;
  catch ERR
    req.id = "-1";
  end

  ## disp (typeinfo (req.params));
  applied = apply_func (req.method, req.params);
  res = savejson ("", struct ("result", applied, "version", req.version, "id", req.id),
                  "Compact", 1, "SingletCell", 0, "SingletArray", 0);
endfunction
