function res = rpc(json)
  addpath([pwd() '/vendor/rpc/jsonlab']);
  addpath([pwd() '/functions']);

  req = loadjson(json);

  try
    _ = req.version;
  catch
    req.version = "1.1";
  end

  try
    _ = req.id;
  catch
    req.id = "1";
  end

  try
    res = savejson('res', struct( ...
      'result', pack(call(str2func(req.method), req.params)), ...
      'version', req.version, ...
      'id', req.id ...
    ));
  catch e
    res = savejson('res', struct( ...
      'error', e, ...
      'version', req.version, ...
      'id', req.id ...
    ));
  end

end
